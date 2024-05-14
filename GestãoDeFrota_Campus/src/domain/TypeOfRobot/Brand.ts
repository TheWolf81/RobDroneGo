import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface BrandProps {
    value: string;
}

export class Brand extends ValueObject<BrandProps> {
    private constructor(props: BrandProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(brand: string): Result<Brand> {

        if (brand == null || brand == undefined || brand.length == 0) {
            return Result.fail<Brand>("Brand is required.");
        }

        if (brand.length < 2 || brand.length > 50) {
            return Result.fail<Brand>("Brand must be between 2 and 50 characters");
        }

        return Result.ok<Brand>(new Brand({ value: brand }));
    }
}