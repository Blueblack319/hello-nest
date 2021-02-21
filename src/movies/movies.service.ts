import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movies.entity';
import { UpdateMovieDto } from './entities/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getById(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) throw new NotFoundException(`Not found Movie with ID: ${id}`);
    return movie;
  }

  create(movieInfo: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieInfo,
    });
  }

  deleteById(id: number): boolean {
    this.getById(id);
    this.movies = this.movies.filter((movie) => movie.id != +id);
    return true;
  }

  update(id: number, updatedData: UpdateMovieDto) {
    const movie = this.getById(id);
    this.deleteById(id);
    this.movies.push({ ...movie, ...updatedData });
  }
}
