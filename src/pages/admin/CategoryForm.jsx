import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import * as categoryService from "../../services/categoryService";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

export default function CategoryForm({ mode }) {
  const [productCount, setProductCount] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      status: "active",
    },
  });

  // ================================
  // EDIT MODE - CATEGORY LOAD
  // ================================
  useEffect(() => {
    const loadSingleCategory = async () => {
      // Create page hole kono data load korbo na
      if (mode !== "edit" || !id) return;

      try {
        setLoading(true);

        // URL-er id diye exact category fetch
        const category = await categoryService.getCategoryById(id);
        console.log(category);


        if (!category) {
          toast.error("Category not found");
          navigate("/admin/categories");
          return;
        }

        // Form-e existing category-r data boshaibo
        reset({
          name: category.name || "",
          status: category.status || "active",
        });
        if (category.productCount !== undefined) {
          setProductCount(category.productCount)

        } else {
          setProductCount(0);
        }

      } catch (error) {
        console.error("Load category error:", error);

        toast.error(
          error.response?.data?.message ||
          "Failed to load category"
        );

        navigate("/admin/categories");
      } finally {
        setLoading(false);
      }
    };

    loadSingleCategory();
  }, [mode, id, reset, navigate]);
  // ================================
  // FORM SUBMIT
  // ================================
  const onSubmit = async (data) => {
    try {
      if (mode === "edit") {
        // Edit hole name + status update
        await categoryService.updateCategory(id, {
          name: data.name,
          status: data.status,
        });
      } else {
        // Create hole name + status create
        await categoryService.createCategory({
          name: data.name,
          status: data.status,
        });
      }

      toast.success(
        mode === "edit"
          ? "Category updated successfully"
          : "Category created successfully"
      );

      navigate("/admin/categories");

    } catch (error) {
      console.error("Category submit error:", error);

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  // Edit page-er data load howar age loader
  if (mode === "edit" && loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-lg space-y-6">

      {/* Page title */}
      <h1 className="text-2xl font-semibold text-gray-900">
        {mode === "edit"
          ? "Edit Category"
          : "Create Category"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-lg border border-gray-100 bg-white p-6"
      >

        {/* =========================
            CATEGORY NAME
        ========================== */}
        <Input
          label="Category Name"
          {...register("name", {
            required: "Category name is required",
          })}
          error={errors.name?.message}
        />

        {/* =========================
            STATUS
        ========================== */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Status
          </label>

          <div className="flex gap-6">

            {/* ACTIVE */}
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                value="active"
                {...register("status")}
              />

              <span className="text-sm text-gray-700">
                Active
              </span>
            </label>

            {/* INACTIVE */}
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                value="inactive"
                {...register("status")}
              />

              <span className="text-sm text-gray-700">
                Inactive
              </span>
            </label>

          </div>
        </div>

        {/* =========================
            PRODUCT COUNT
        ========================== */}

        {mode === "edit" && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Products
            </label>

            <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600">
              {productCount}
            </div>
          </div>
        )}

        {/* =========================
            BUTTONS
        ========================== */}

        <div className="flex gap-3">

          <Button type="submit">
            {mode === "edit"
              ? "Update Category"
              : "Create Category"}
          </Button>

          <Button
            type="button"
            variant="border"
            onClick={() =>
              navigate("/admin/categories")
            }
          >
            Cancel
          </Button>

        </div>

      </form>
    </div>
  );
}