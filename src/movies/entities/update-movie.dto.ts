import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from '../dto/create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
