//create category
//       element: <CategoryAdd />,
//     },

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CategoryApi from "@/api/categoryApi";
import { Input, Button, Typography } from "@material-tailwind/react";

function CategoryAdd() {

    

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (data, { setSubmitting, setStatus }) => {
            try {
                await CategoryApi.createCategory(data);
                setStatus("success");
                alert("Create category successfully");
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setSubmitting(false);
                window.location.href = "/profile/admin";
            }
        },
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
                <form
                    onSubmit={formik.handleSubmit}
                    className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96"
                >
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Name
                        </Typography>
                        <Input
                            onChange={formik.handleChange}
                            size="lg"
                            name="name"
                            value={formik.values.name}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </div>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Description
                        </Typography>
                        <Input
                            onChange={formik.handleChange}
                            size="lg"
                            name="description"
                            value={formik.values.description}
                            error={
                                formik.touched.description && Boolean(formik.errors.description)
                            }
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </div>
                    <Button
                        color="lightBlue"
                        buttonType="filled"
                        size="lg"
                        type="submit"
                        rounded={false}
                        block={false}
                        iconOnly={false}
                        ripple="light"
                    >
                        Create
                    </Button>
                </form>
            </main>
        </div>
    );
}

export default CategoryAdd;