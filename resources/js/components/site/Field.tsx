import type { ElementType, ReactNode } from 'react';

interface FieldProps {
    id: string;
    label: string;
    error?: string;
    as?: ElementType;
    children?: ReactNode;
    className?: string;
    [k: string]: any;
}

/** Labelled form field with an inline error under the input. */
export default function Field({
    id,
    label,
    error,
    as: Tag = 'input',
    children,
    className,
    ...props
}: FieldProps) {
    return (
        <div className={`grid gap-2 ${className || ''}`}>
            <label htmlFor={id} className="field-label">
                {label}
            </label>
            <Tag
                id={id}
                className="field-input"
                aria-invalid={!!error}
                {...props}
            >
                {children}
            </Tag>
            {error && <span className="text-[13px] text-danger">{error}</span>}
        </div>
    );
}
