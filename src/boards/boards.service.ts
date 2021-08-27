import { Injectable } from '@nestjs/common';
import { BoardStatus } from './boards.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }

  getBoardById(index: number): Promise<Board> {
    return this.boardRepository.getBoardByIndex(index);
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  delelteBoard(index: number, user: User): Promise<void> {
    return this.boardRepository.delelteBoard(index, user);
  }

  updateBoardStatus(index: number, status: BoardStatus): Promise<Board> {
    return this.boardRepository.updateBoardStatus(index, status);
  }
}
