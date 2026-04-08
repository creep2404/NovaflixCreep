import { QueryDto } from "@/common/dto/common.dto";

export interface QueryMovieDto extends QueryDto {
  genres?: string[]; 
  rating?: number;
  duration?: "short" | "medium" | "long";
  premium?: boolean;
}
