import React, { useEffect } from "react";
import "../../style/admin-panel/form-field.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardButton } from "./index.js";

const SongFormField = ({ data, setter }) => {
  const MAX_SONG_SIZE = 1024 * 1024 * 20;
  const MAX_SNIPPET_SIZE = 1024 * 1024 * 1;
  const ACCEPTED_FILE_TYPES = ["audio/mpeg"];

  const schema = z.object({
    title: z.string().toUpperCase().trim(),
    genre: z
      .string()
      .regex(/^[a-zA-Z0-9 /&-]+$/, "Only A-Z 0-9 /&- and spaces are allowed")
      .toUpperCase()
      .trim(),
    bpm: z.number().int().max(300, { error: "BPM value is too high > 300" }),
    yor: z
      .number()
      .int()
      .min(1900)
      .max(new Date().getFullYear(), {
        error: `Invalid year, the year is ${new Date().getFullYear()}`,
      }),

    songFile: z
      .any()
      // .refine((file) => {
      //   return !file || file.size <= MAX_SONG_SIZE;
      // }, "File size must be less than 20MB")
      // .refine((file) => {
      //   return ACCEPTED_FILE_TYPES.includes(file.type);
      // }, "File type must be a MP3")
      .nullable(),
    snippetFile: z
      .any()
      // .refine((file) => {
      //   return !file || file.size <= MAX_SNIPPET_SIZE;
      // }, "File size must be less than 1MB")
      // .refine((file) => {
      //   return ACCEPTED_FILE_TYPES.includes(file.type);
      // }, "File type must be a MP3")
      .nullable(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: data?.title || "",
      genre: data?.genre || "",
      bpm: data?.bpm || "",
      yor: data?.yor || "",
      songFile: null,
      snippetFile: null,
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: data?.title || "",
      genre: data?.genre || "",
      bpm: data?.bpm || "",
      yor: data?.yor || "",
      songFile: null,
      snippetFile: null,
    });
  }, [data, reset]);

  const onSubmit = (data) => {
    const { title, genre, bpm, yor, songFile, snippetFile } = data;
    setter({
      songData: {
        title,
        genre,
        bpm,
        yor,
      },
      songFile: songFile?.[0] || null,
      snippetFile: snippetFile?.[0] || null,
    });
  };

  return (
    <form className="form-field" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field-inputs">
        <div className="form-field-input-container">
          <label>Title</label>
          <input
            className="form-field-input"
            {...register("title")}
            type="text"
          ></input>
          {errors.title && <div>{errors.title.message}</div>}
        </div>
        <div className="form-field-input-container">
          <label>Genre</label>
          <input
            className="form-field-input"
            {...register("genre")}
            type="text"
          ></input>
          {errors.genre && <div>{errors.genre.message}</div>}
        </div>
      </div>
      <div className="form-field-inputs">
        <div className="form-field-input-container">
          <label>BPM</label>
          <input
            className="form-field-input"
            {...register("bpm", { valueAsNumber: true })}
            type="number"
          ></input>
          {errors.bpm && <div>{errors.bpm.message}</div>}
        </div>
        <div className="form-field-input-container">
          <label>YOR</label>
          <input
            className="form-field-input"
            {...register("yor", { valueAsNumber: true })}
            type="number"
          ></input>
          {errors.yor && <div>{errors.yor.message}</div>}
        </div>
      </div>
      <div className="form-field-upload-container">
        <div className="form-field-upload">
          <label>Full Song</label>
          <input {...register("songFile")} type="file" accept=".mp3"></input>
        </div>
        <div className="form-field-upload">
          <label>Snippet</label>
          <input {...register("snippetFile")} type="file" accept=".mp3"></input>
        </div>
      </div>
      <div className="form-field-submit-button">
        <DashboardButton type="submit" value="Submit" variant="utility" />
      </div>
    </form>
  );
};

export default SongFormField;
