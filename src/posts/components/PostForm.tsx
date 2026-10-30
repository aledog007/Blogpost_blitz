import React from "react"
import { Form, FormProps } from "src/core/components/Form"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { LabeledTextArea } from "src/core/components/LabeledTextArea"

import { z } from "zod"
export { FORM_ERROR } from "src/core/components/Form"

export function PostForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="title" label="Titel" placeholder="Titel des Beitrags" type="text" />
      <LabeledTextArea name="content" label="Inhalt" placeholder="Was möchtest du erzählen?" />
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  )
}
