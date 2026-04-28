import { QueryDto } from "@/common/dto/query.dto";

export interface QueryGenreDto extends QueryDto {
  optional?: string;
}
