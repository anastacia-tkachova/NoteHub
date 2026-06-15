'use client';
import css from './NoteForm.module.css';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type NoteTag, VALID_TAGS } from '@/types/note';
import { createNote } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useNoteDraftStore } from '@/lib/store/noteStore';

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title is too long')
    .required('Title is required'),
  content: Yup.string().max(500, 'Content is too long').defined(),
  tag: Yup.string()
    .oneOf([...VALID_TAGS], 'Invalid tag selected')
    .required(),
});

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => router.back();

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
  });

  const handleSubmit = async (formData: FormData) => {
    setErrors({});

    const rawValues: NoteFormValues = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag,
    };

    try {
      const validatedData = await NoteFormSchema.validate(rawValues, {
        abortEarly: false,
      });
      createNoteMutation.mutate(validatedData);
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        e.inner.forEach(error => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label className={css.formGroup}>
          Title
          <input
            type="text"
            name="title"
            defaultValue={draft?.title}
            onChange={handleChange}
            className={css.input}
          />
        </label>
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label className={css.formGroup}>
          Content
          <textarea
            name="content"
            rows={8}
            defaultValue={draft?.content}
            onChange={handleChange}
            className={css.textarea}
          ></textarea>
        </label>
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label className={css.formGroup}>
          Category
          <select
            name="tag"
            className={css.select}
            defaultValue={draft?.tag}
            onChange={handleChange}
          >
            {VALID_TAGS.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelButton}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={createNoteMutation.isPending}
        >
          {createNoteMutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
