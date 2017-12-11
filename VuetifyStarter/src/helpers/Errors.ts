/**
 * Handles model validation errors.
 */
export class Errors {
    errors: {};

    /**
     * Create a new Errors instance.
     */
    constructor() {
        this.errors = {};
    }

    /**
     * Determine if an errors exists for the given field.
     */
    has(field: string): boolean {
        let prop = this.errors.hasOwnProperty(field);
        return this.errors.hasOwnProperty(field);
    }

    /**
     * Determine if we have any errors.
     */
    any(): boolean {
        return Object.keys(this.errors).length > 0;
    }

    /**
     * Retrieve the error message for a field.
     */
    get(field: string): string[] {
        if (this.has(field))
            return this.errors[field];
        else
            return [];
    }

    /**
     * Record the new errors.
     */
    record(errors: object): void {
        for (var prop in errors) {
            const camelCase = prop.charAt(0).toLowerCase() + prop.slice(1);
            if (errors.hasOwnProperty(prop)) this.errors[camelCase] = errors[prop];
        }
        //this.errors = errors;
    }

    /**
     * Clear one or all error fields.
     */
    clear(field?: string): void {
        if (field) 
            delete this.errors[field];
        else
            this.errors = {};
    }
}