import type {
  ActionArgs,
  ActionFunction,
  V2_MetaFunction
} from "@remix-run/node";

import { json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Welcome to Open Ecommerce" }];
};

export const action = async ({ request }: ActionArgs) => {
  let formData = await request.formData();
  let { _action, ...values } = Object.fromEntries(formData);

  let data = await db.store.create({
    data: {
      name: values.name,
      company: { connect: { id: +values.companyId } }
    }
  });

  return json({ success: true, data }, { status: 201 });
};

export default function Index() {
  return (
    <>
      <Form method="POST" className="flex flex-col">
        <input className="border" type="text" name="name" />
        <input className="border" type="text" name="companyId" />
        {/* <textarea className="border" name="description"></textarea> */}
        <button>Add Company</button>
      </Form>
    </>
  );
}
