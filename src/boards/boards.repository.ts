import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './boards.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async getAllBoards(): Promise<Board[]> {
    return this.find();
  }

  async getBoardByIndex(index: number): Promise<Board> {
    const found = await this.findOne(index);

    if (!found) {
      throw new NotFoundException(`Not Existing ID : ${index}`);
    }

    return found;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const date = new Date();
    const { title, description } = createBoardDto;

    const newBoard: Board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
      creator: user.id,
      createAt: `${date.getFullYear()}.${
        date.getMonth() + 1
      }.${date.getDate()}.${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`,
    });

    await this.save(newBoard);

    return newBoard;
  }

  async delelteBoard(index: number, user: User): Promise<void> {
    const result = await this.delete({ index, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Not Existing Index : ${index}`);
    }
  }

  async updateBoardStatus(index: number, status: BoardStatus): Promise<Board> {
    const updateBoard = await this.getBoardByIndex(index);
    updateBoard.status = status;
    await this.save(updateBoard);

    return updateBoard;
  }
}
