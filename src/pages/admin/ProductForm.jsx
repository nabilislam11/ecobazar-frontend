import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import * as productService from "../../services/productService";
import * as categoryService from "../../services/categoryService";
import * as brandService from "../../services/brandService";

import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";

export default function ProductForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      shortDescription: "",
      price: "",
      stock: "",
      discountType: "none",
      discount: 0,
      brand: "",
      category: "",
      subCategory: "",
      showProduct: "",
      status: "pending",
      tag: "",
      discountStartDate: "",
      discountEndDate: "",
    },
  });

  const discountType = watch("discountType");

  // =========================
  // LOAD CATEGORIES
  // =========================

  const loadCategories = async () => {
    try {
      const response = await categoryService.getCategories();
      const categoryList = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

      console.log("CATEGORY RESPONSE:", response);
      console.log("CATEGORY LIST:", categoryList);
      setCategories(categoryList);
    } catch (error) {
      console.error("Failed to load categories:", error);

      setCategories([]);

      toast.error(
        error.response?.data?.message ||
        "Failed to load categories"
      );
    }
  };

  // =========================
  // LOAD SUB CATEGORIES
  // =========================

  const loadSubCategories = async () => {
    try {
      const response =
        await categoryService.getSubCategories();

      const subCategoryList = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

      setSubCategories(subCategoryList);
    } catch (error) {
      console.error(
        "Failed to load subcategories:",
        error
      );

      setSubCategories([]);
    }
  };

  // =========================
  // LOAD BRANDS
  // =========================

  const loadBrands = async () => {
    try {
      const response =
        await brandService.getBrands();
      const brandList = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

      setBrands(brandList);
    } catch (error) {
      console.error(
        "Failed to load brands:",
        error
      );

      setBrands([]);

      toast.error(
        error.response?.data?.message ||
        "Failed to load brands"
      );
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    loadCategories();
    loadSubCategories();
    loadBrands();
  }, []);

  // =========================
  // LOAD PRODUCT FOR EDIT
  // =========================

  useEffect(() => {
    if (mode !== "edit" || !id) return;

    const loadProduct = async () => {
      try {
        const response =
          await productService.getProductById(id);

        // Backend যদি { data: product } দেয়
        const product =
          response?.data || response;

        if (!product) return;

        reset({
          title: product.title || "",
          description: product.description || "",
          shortDescription:
            product.shortDescription || "",
          price: product.price ?? "",
          stock: product.stock ?? "",
          discountType:
            product.discountType || "none",
          discount: product.discount ?? 0,
          discountStartDate: product.discountStartDate
            ? product.discountStartDate.slice(0, 10)
            : "",

          discountEndDate: product.discountEndDate
            ? product.discountEndDate.slice(0, 10)
            : "",
          brand: product.brand || "",
          category: product.category || "",
          subCategory:
            product.subCategory || "",
          status: product.status || "pending",
          showProduct: product.showProduct,
          tag: Array.isArray(product.tag)
            ? product.tag.join(", ")
            : product.tag || "",
        });

        if (
          Array.isArray(product.images) &&
          product.images.length > 0
        ) {
          setSelectedImages(product.images);

          const mainIndex =
            product.images.findIndex(
              (image) => image.isMain === true
            );

          setMainImageIndex(
            mainIndex >= 0 ? mainIndex : 0
          );
        }
      } catch (error) {
        console.error(
          "Failed to load product:",
          error
        );

        toast.error("Failed to load product");
      }
    };

    loadProduct();
  }, [mode, id, reset]);

  // =========================
  // IMAGE CHANGE
  // =========================

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    if (files.length > 5) {
      toast.error(
        "You can upload maximum 5 images"
      );

      e.target.value = "";
      return;
    }

    setSelectedImages(files);

    setMainImageIndex(0);
  };

  // =========================
  // REMOVE IMAGE
  // =========================

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => {
      const updatedImages =
        prevImages.filter(
          (_, imageIndex) =>
            imageIndex !== index
        );

      return updatedImages;
    });

    setMainImageIndex((prevMainIndex) => {
      if (prevMainIndex === index) {
        return 0;
      }

      if (prevMainIndex > index) {
        return prevMainIndex - 1;
      }

      return prevMainIndex;
    });
  };

  // =========================
  // GET IMAGE PREVIEW
  // =========================

  const getImagePreview = (image) => {
    // New uploaded file
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }

    // Existing backend image
    if (image?.url) {
      return `http://localhost:5000/${image.url}`;
    }

    return "";
  };

  // =========================
  // SUBMIT
  // =========================

  const onSubmit = async (data) => {

    try {
      if (selectedImages.length === 0) {
        toast.error(
          "Please select at least one image"
        );

        return;
      }

      const formData = new FormData();

      // =========================
      // BASIC INFO
      // =========================

      formData.append(
        "title",
        data.title
      );

      formData.append(
        "description",
        data.description || ""
      );

      formData.append(
        "shortDescription",
        data.shortDescription || ""
      );

      // =========================
      // PRICE & STOCK
      // =========================

      formData.append(
        "price",
        Number(data.price)
      );

      formData.append(
        "stock",
        Number(data.stock)
      );

      // =========================
      // DISCOUNT
      // =========================

      formData.append(
        "discountType",
        data.discountType || "none"
      );

      formData.append(
        "discount",
        data.discountType === "none"
          ? 0
          : Number(data.discount || 0)
      );
      formData.append(
        "discountStartDate",
        data.discountStartDate || ""
      );

      formData.append(
        "discountEndDate",
        data.discountEndDate || ""
      );
      // =========================
      // CATEGORY / BRAND
      // =========================

      formData.append(
        "category",
        data.category || ""
      );

      formData.append(
        "subCategory",
        data.subCategory || ""
      );

      formData.append(
        "brand",
        data.brand || ""
      );

      // =========================
      // STATUS
      // =========================

      formData.append(
        "status",
        data.status || "pending"
      );
      //==============
      //showproduct
      //============
      formData.append(
        "showProduct",
        data.showProduct || ""
      );
      // =========================
      // MAIN IMAGE INDEX
      // =========================

      formData.append(
        "isMain",
        mainImageIndex
      );

      // =========================
      // TAG
      // =========================

      if (data.tag?.trim()) {
        formData.append(
          "tag",
          data.tag
        );
      }

      // =========================
      // IMAGES
      // =========================
      // Existing + New image information
      const imageData = selectedImages.map((image, index) => ({
        type: image instanceof File ? "new" : "existing",
        index,
        _id: image instanceof File ? null : image._id,
        url: image instanceof File ? null : image.url,
      }));

      formData.append(
        "imageData",
        JSON.stringify(imageData)
      );

      // New uploaded images
      selectedImages.forEach((image) => {
        if (image instanceof File) {
          formData.append("images", image);
        }
      });

      // DEBUG FORM DATA

      for (
        const [key, value]
        of formData.entries()
      ) {

      }

      // =========================
      // CREATE / UPDATE
      // =========================

      if (mode === "edit") {
        await productService.updateProduct(
          id,
          formData
        );

        toast.success(
          "Product updated successfully"
        );
      } else {
        await productService.createProduct(
          formData
        );

        toast.success(
          "Product created successfully"
        );
      }

      navigate("/admin/products");

    } catch (error) {
      console.error(
        "Product submit error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to save product"
      );
    }
  };

  return (
    <div className="max-w-4xl space-y-6">

      {/* HEADER */}

      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {mode === "edit"
            ? "Edit Product"
            : "Create Product"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Add product information, pricing,
          stock and images.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, (errors) => console.log("FORM VALIDATION ERRORS:", errors))}

        className="space-y-6 rounded-lg border border-gray-100 bg-white p-6"
      >

        {/* =========================
            BASIC INFORMATION
        ========================= */}

        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Basic Information
          </h2>

          <div className="space-y-4">

            <Input
              label="Product Title"
              {...register("title", {
                required:
                  "Product title is required",
              })}
              error={errors.title?.message}
            />

            <label className="block">
              <span className="mb-2 block text-sm text-gray-900">
                Short Description
              </span>

              <textarea
                rows={3}
                {...register(
                  "shortDescription"
                )}
                className="w-full rounded border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-gray-900">
                Description
              </span>

              <textarea
                rows={5}
                {...register("description")}
                className="w-full rounded border border-gray-200 px-4 py-3 text-sm outline-none focus:border-green-500"
              />
            </label>

          </div>
        </div>

        {/* =========================
            CATEGORY / BRAND
        ========================= */}

        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Category & Brand
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <Select
              label="Category"
              error={errors.category?.message}
              {...register("category", {
                required: "Category is required",
              })}
            >
              <option value="">
                Select Category
              </option>

              {categories.map((category) => (
                <option
                  value={category._id}
                  key={category._id}
                >
                  {category.name}
                </option>
              ))}
            </Select>

            <Select
              label="Sub Category"
              {...register("subCategory")}
            >
              <option value="">
                Select Sub Category
              </option>

              {subCategories.map(
                (subCategory) => (
                  <option
                    value={subCategory._id}
                    key={
                      subCategory._id
                    }
                  >
                    {subCategory.name}
                  </option>
                )
              )}
            </Select>

            <Select
              label="Brand"
              {...register("brand")}
            >
              <option value="">
                Select Brand
              </option>

              {brands.map((brand) => (
                <option
                  key={
                    brand._id ||
                    brand.id
                  }
                  value={brand.name}
                >
                  {brand.name}
                </option>
              ))}
            </Select>

          </div>
        </div>

        {/* =========================
            PRICE & STOCK
        ========================= */}

        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Pricing & Stock
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <Input
              label="Price"
              type="number"
              min="0"
              step="0.01"
              {...register("price", {
                required:
                  "Price is required",

                min: {
                  value: 0,
                  message:
                    "Price cannot be negative",
                },
              })}
              error={errors.price?.message}
            />

            <Input
              label="Stock"
              type="number"
              min="0"
              step="1"
              {...register("stock", {
                required:
                  "Stock is required",

                min: {
                  value: 0,
                  message:
                    "Stock cannot be negative",
                },
              })}
              error={errors.stock?.message}
            />

          </div>
        </div>

        {/* =========================
    DISCOUNT
========================= */}

        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Discount
          </h2>

          {/* Discount Type + Amount */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <Select
              label="Discount Type"
              {...register("discountType")}
            >
              <option value="none">
                No Discount
              </option>

              <option value="percentage">
                Percentage (%)
              </option>

              <option value="flat">
                Flat Amount
              </option>
            </Select>

            <Input
              label={
                discountType === "percentage"
                  ? "Discount (%)"
                  : "Discount Amount"
              }
              type="number"
              min="0"
              step="0.01"
              disabled={discountType === "none"}
              {...register("discount", {
                min: {
                  value: 0,
                  message: "Discount cannot be negative",
                },

                validate: (value) => {
                  if (
                    discountType === "percentage" &&
                    Number(value) > 100
                  ) {
                    return "Percentage cannot be greater than 100";
                  }

                  return true;
                },
              })}
              error={errors.discount?.message}
            />

          </div>

          {/* =========================
      DISCOUNT PERIOD
  ========================= */}

          {discountType !== "none" && (
            <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-4">

              {/* Header */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  Discount Period
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Set the date range when this discount will be active.
                </p>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {/* Start Date */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Start Date
                  </label>

                  <input
                    type="date"
                    {...register("discountStartDate", {
                      required:
                        discountType !== "none"
                          ? "Start date is required"
                          : false,
                    })}
                    className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />

                  {errors.discountStartDate && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.discountStartDate.message}
                    </p>
                  )}
                </div>

                {/* End Date */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    End Date
                  </label>

                  <input
                    type="date"
                    {...register("discountEndDate", {
                      required:
                        discountType !== "none"
                          ? "End date is required"
                          : false,

                      validate: (value) => {
                        const startDate = watch(
                          "discountStartDate"
                        );

                        if (
                          startDate &&
                          value &&
                          value < startDate
                        ) {
                          return "End date cannot be before start date";
                        }

                        return true;
                      },
                    })}
                    className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />

                  {errors.discountEndDate && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.discountEndDate.message}
                    </p>
                  )}
                </div>

              </div>

            </div>
          )}

        </div>


        {/* =========================
            PRODUCT IMAGES
        ========================= */}

        <div className="space-y-4">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Product Images
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="block w-full rounded-md border border-gray-200 px-4 py-3 text-sm"
            />

            <p className="mt-2 text-xs text-gray-500">
              Select minimum 1 and maximum
              5 images at once.
            </p>
          </div>

          {selectedImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">

              {selectedImages.map(
                (image, index) => (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-lg border p-2 ${mainImageIndex === index
                      ? "border-green-500"
                      : "border-gray-200"
                      }`}
                  >

                    <img
                      src={getImagePreview(image)}
                      alt={`Product ${index + 1
                        }`}
                      className="h-28 w-full rounded object-cover"
                    />

                    <div className="mt-2 flex items-center justify-between gap-2">

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="mainImageIndex"
                          checked={
                            mainImageIndex ===
                            index
                          }
                          onChange={() =>
                            setMainImageIndex(
                              index
                            )
                          }
                        />

                        <span className="text-xs text-gray-600">
                          Main
                        </span>
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveImage(
                            index
                          )
                        }
                        className="text-xs font-medium text-red-500"
                      >
                        Remove
                      </button>

                    </div>

                    {mainImageIndex ===
                      index && (
                        <p className="mt-1 text-xs font-medium text-green-600">
                          Main Image
                        </p>
                      )}

                  </div>
                )
              )}

            </div>
          )}

        </div>

        {/* =========================
            TAGS
        ========================= */}

        <Input
          label="Tags"
          {...register("tag")}
          placeholder="organic, fresh, vegetable"
        />

        <p className="-mt-4 text-xs text-gray-500">
          Separate tags using commas.
        </p>

        {/* =========================
            STATUS
        ========================= */}
        <div>


          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <Select
              label="Status"
              {...register("status")}
            >
              <option value="pending">
                Pending
              </option>

              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </Select>
            <Select
              label="showProduct"
              {...register("showProduct")}
            >
              <option value="todaysDeal">
                Todays Deal
              </option>

              <option value="fuaturedProducts">
                Fuatured Products
              </option>

              <option value="newArrivals">
                New Arrivals
              </option>
              <option value="none">
                None
              </option>
            </Select>


          </div>
        </div>


        {/* =========================
            BUTTONS
        ========================= */}

        <div className="flex gap-3 pt-4">

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : mode === "edit"
                ? "Update Product"
                : "Create Product"}
          </Button>

          <Button
            type="button"
            variant="border"
            onClick={() =>
              navigate("/admin/products")
            }
          >
            Cancel
          </Button>

        </div>

      </form>
    </div>
  );
}