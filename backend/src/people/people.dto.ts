// pessoa/pessoa.dto.ts
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { Type,} from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/address/address.dto';

export class CreatePeopleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  birthdayDate: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses: CreateAddressDto[];
}

export class UpdatePeopleDto {
  @IsString()
  name?: string;

  @IsString()
  gender?: string;

  birthdayDate?: string;

  @IsString()
  status?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  addresses: CreateAddressDto[];
}
