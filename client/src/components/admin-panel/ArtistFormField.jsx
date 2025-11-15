import React, { useEffect } from "react";
import "../../style/admin-panel/form-field.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardButton } from "./index.js";
const ArtistFormField = ({ data, setter }) => {
  const schema = z.object({
    fullName: z.string().toUpperCase().trim(),
    stageName: z
      .string()
      .regex(/^[a-zA-Z0-9 /.&+#-]+$/, "Only A-Z 0-9 and symbols are allowed")
      .toUpperCase()
      .trim(),
    bioFull: z
      .string()
      .max(200)
      .regex(/^[a-zA-Z0-9 /,.]+$/, "Only A-Z 0-9 and symbols are allowed"),
    portraitFile: z.any().nullable(),
    // .file()
    // .min(1)
    // .max(5_000_000)
    // .mime("image/svg+xml", { error: "Invalid file type" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: data?.fullName || "",
      stageName: data?.stageName || "",
      bioFull: data?.bioFull || "",
      portraitFile: null,
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      fullName: data?.fullName || "",
      stageName: data?.stageName || "",
      bioFull: data?.bioFull || "",
      portraitFile: null,
    });
  }, [data, reset]);

  const onSubmit = (data) => {
    const { fullName, stageName, bioFull, portraitFile } = data;

    setter({
      artistData: {
        fullName,
        stageName,
        bioFull,
      },
      portraitFile: portraitFile?.[0] || null,
    });
  };

  return (
    <form className="form-field" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field-inputs">
        <div className="form-field-input-container">
          <label>Full Name</label>
          <input
            className="form-field-input"
            {...register("fullName")}
            type="text"
          ></input>
          {errors.fullName && <div>{errors.fullName.message}</div>}
        </div>
        <div className="form-field-input-container">
          <label>Stage Name</label>
          <input
            className="form-field-input"
            {...register("stageName")}
            type="text"
          ></input>
          {errors.stageName && <div>{errors.stageName.message}</div>}
        </div>
      </div>
      <div className="form-field-inputs">
        <div className="form-field-input-container">
          <label>BIO</label>
          <textarea
            className="form-field-input form-field-text-area"
            {...register("bioFull")}
            rows="7"
            cols="60"
          ></textarea>
          {errors.bioFull && <div>{errors.bioFull.message}</div>}
        </div>
      </div>
      <div className="form-field-upload-container">
        <div className="form-field-upload">
          <label>Artist Portrait</label>
          <input
            {...register("portraitFile")}
            type="file"
            accept=".svg"
          ></input>
        </div>
      </div>
      <div className="form-field-submit-button">
        <DashboardButton type="submit" value="Submit" variant="utility" />
      </div>
    </form>
  );
};

export default ArtistFormField;
