import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface CategoryProps {
    value: string;
}

export class Category extends ValueObject<CategoryProps> {
    private constructor(props: CategoryProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(category : string): Result<Category> {
        if(!category || category.length === 0) {
            return Result.fail<Category>('Must provide a category');
        }
        else if (!["Gabinete", "Anfiteatro", "Laboratório", "Outro"].includes(category)) {
            return Result.fail<Category>('Must provide a valid category');
            }
        return Result.ok<Category>(new Category({ value: category }));
    }
}