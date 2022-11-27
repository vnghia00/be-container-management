import { IsNumber, IsString, IsBoolean, IsOptional, IsArray, IsMongoId } from "class-validator";
export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    code: string;

    @IsString()
    category: string;

    @IsString()
    type: string;

    @IsNumber()
    price: number;

     /**
     * Check done of order
     * @example true
     */
    @IsBoolean()
    @IsOptional()
    show: boolean;

     /**
     * Array of containers id
     * @example ["6118e9fcb952b9001ce3a9ea"]
     */
      @IsArray()
      @IsMongoId({ each: true })
      containers: string[];
}
