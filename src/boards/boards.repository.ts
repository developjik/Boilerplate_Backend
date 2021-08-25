import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './boards.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async getAllBoards(): Promise<Board[]> {
    return this.find();
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException(`Not Existing ID : ${id}`);
    }

    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const newBoard: Board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(newBoard);

    return newBoard;
  }

  async delelteBoard(id: number): Promise<void> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Not Existing ID : ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const updateBoard = await this.getBoardById(id);
    updateBoard.status = status;
    await this.save(updateBoard);

    return updateBoard;
  }
}
