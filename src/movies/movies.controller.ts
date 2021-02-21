import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movies.entity';
import { UpdateMovieDto } from './entities/update-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll() {
    return this.moviesService.getAll();
  }

  // @Get('search')
  // search(@Query('year') searchingYear: string) {
  //   return `This will search movies made after: ${searchingYear}`;
  // }

  @Get(':id')
  getById(@Param('id') movieId: number): Movie {
    const movie = this.moviesService.getById(movieId);
    if (!movie) {
      throw new NotFoundException(`Not found Movie with ID: ${movieId}`);
    }
    return movie;
  }

  @Post()
  create(@Body() movieInfo: CreateMovieDto) {
    return this.moviesService.create(movieInfo);
  }

  @Delete(':id')
  deleteById(@Param('id') movieId: number) {
    this.getById(movieId);
    this.moviesService.deleteById(movieId);
  }

  @Patch(':id')
  update(@Param('id') movieId: number, @Body() updatedData: UpdateMovieDto) {
    this.getById(movieId);
    this.moviesService.update(movieId, updatedData);
  }
}
