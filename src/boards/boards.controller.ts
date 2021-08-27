import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardStatus } from './boards.status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController');

  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get('/:index')
  getBoardById(@Param('index') index: number): Promise<Board> {
    return this.boardsService.getBoardById(index);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @Req() req,
  ): Promise<Board> {
    this.logger.verbose(`${req.user.id} creating a new board.
    Payload : ${JSON.stringify(createBoardDto, req.user)}`);
    return this.boardsService.createBoard(createBoardDto, req.user);
  }

  @Delete('/:index')
  deleteBoard(@Param('index', ParseIntPipe) index, @Req() req): Promise<void> {
    return this.boardsService.delelteBoard(index, req.user);
  }

  @Patch('/:index/status')
  updateBoardStatus(
    @Param('index', ParseIntPipe) index: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(index, status);
  }
}
