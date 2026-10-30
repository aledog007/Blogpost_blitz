import { forwardRef, PropsWithoutRef } from "react"
import { useField, useFormikContext, ErrorMessage } from "formik"

export interface LabeledTextAreaProps
  extends PropsWithoutRef<React.JSX.IntrinsicElements["textarea"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  outerProps?: PropsWithoutRef<React.JSX.IntrinsicElements["div"]>
}

/** Mehrzeiliges Gegenstück zu LabeledTextField (der Generator kennt nur einzeilige Inputs). */
export const LabeledTextArea = forwardRef<HTMLTextAreaElement, LabeledTextAreaProps>(
  ({ name, label, outerProps, rows = 10, ...props }, ref) => {
    const [input] = useField(name)
    const { isSubmitting } = useFormikContext()

    return (
      <div {...outerProps}>
        <label>
          {label}
          <textarea {...input} disabled={isSubmitting} rows={rows} {...props} ref={ref} />
        </label>

        <ErrorMessage name={name}>
          {(msg) => (
            <div role="alert" style={{ color: "#b00020" }}>
              {msg}
            </div>
          )}
        </ErrorMessage>

        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            font-size: 1rem;
          }
          textarea {
            font: inherit;
            padding: 0.5rem;
            border-radius: 3px;
            border: 1px solid purple;
            margin-top: 0.5rem;
            resize: vertical;
          }
        `}</style>
      </div>
    )
  }
)

export default LabeledTextArea
