import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/**
 * DTO for updating user profile.
 */
export class UpdateProfileDto {
  @ApiPropertyOptional({ description: 'Full name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Phone number' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ description: 'Date of birth' })
  @IsString()
  @IsOptional()
  dateOfBirth?: string;
}
