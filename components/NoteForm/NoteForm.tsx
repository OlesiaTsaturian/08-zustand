'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';

import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { createNote, type CreateParams } from '../../lib/api';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/stores/noteStore';

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title must be at most 50 characters')
      .required('Title is required')
      .trim(),
    content: Yup.string()
      .max(500, 'Content must be at most 500 characters')
      .trim(),
    tag: Yup.string()
      .oneOf(
        ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'],
        'Please select a tag',
      )
      .required('Please select a tag'),
  });

  const createNoteMutation = useMutation({
    mutationFn: (newNote: CreateParams) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });

      toast.success('Note added successfully!', { duration: 7000 });

      clearDraft();

      router.back();
    },
    onError: () => {
      toast.error('Failed to add note. Please try again.', { duration: 7000 });
    },
  });

  const handleClick = () => {
    router.back();
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (formData: FormData) => {
    const content = formData.get('content');
    const title = formData.get('title');
    const tag = formData.get('tag');

    if (
      typeof content !== 'string' ||
      typeof title !== 'string' ||
      typeof tag !== 'string'
    ) {
      return;
    }

    const newNote: CreateParams = {
      title: title.trim(),
      tag,
      content: content.trim(),
    };

    try {
      await validationSchema.validate(newNote, { abortEarly: false });
      createNoteMutation.mutate(newNote);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.errors.forEach((message) =>
          toast.error(message, { duration: 7000 }),
        );
      }
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title </label>
          <input
            id="title"
            type="text"
            name="title"
            className={css.input}
            value={draft.title}
            onChange={handleChange}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content </label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            value={draft.content}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag </label>
          <select
            id="tag"
            name="tag"
            className={css.select}
            onChange={handleChange}
            value={draft.tag}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={handleClick}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </form>
    </>
  );
}
// const queryClient = useQueryClient();
// const router = useRouter();
// const { draft, setDraft, clearDraft } = useNoteDraftStore();

// const handleChange = (
//   event: React.ChangeEvent<
//     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//   >,
// ) => {
//   setDraft({
//     ...draft,
//     [event.target.name]: event.target.value,
//   });
// };
// const { mutate } = useMutation({
//   mutationFn: createNote,
//   // 5. При успішному створенні нотатки очищуємо чернетку
//   onSuccess: () => {
//     clearDraft();
//     router.push('/notes/filter/all');
//   },
// });

// const handleSubmit = (formData: FormData) => {
//   const values = Object.fromEntries(formData) as NewNoteData;
//   mutate(values);
// };

// const handleCancel = () => router.push('/notes/filter/all');

// const noteMutation = useMutation({
//   mutationFn: (newNote: CreateParams) => createNote(newNote),
//   onSuccess: () => {
//     queryClient.invalidateQueries({ queryKey: ['notes'] });
//     onClose();
//     toast.success('Note added successfully!');
//   },
//   onError: () => {
//     toast.error('Failed to add note');
//   },
// });
// const formValues = (
//   values: CreateParams,
//   actions: FormikHelpers<CreateParams>,
// ) => {
//   const valuesTrimmer = {
//     tag: values.tag,
//     content: values.content.trim(),
//     title: values.title.trim(),
//   };

//   noteMutation.mutate(valuesTrimmer);

//   actions.resetForm();
// };

//   return (
//     <>
//       <Toaster position="top-right" />
//       <form className={css.form}>
//         <div className={css.formGroup}>
//           <label htmlFor="title">Title</label>
//           <input id="title" type="text" name="title" className={css.input} />
//         </div>

//         <div className={css.formGroup}>
//           <label htmlFor="content">Content</label>
//           <input
//             id="content"
//             type="text"
//             name="content"
//             className={css.textarea}
//           />
//         </div>

//         <div className={css.formGroup}>
//           <label htmlFor="tag">Tag</label>
//           <select id="tag" name="tag" className={css.select}>
//             <option value="Todo">Todo</option>
//             <option value="Work">Work</option>
//             <option value="Personal">Personal</option>
//             <option value="Meeting">Meeting</option>
//             <option value="Shopping">Shopping</option>
//           </select>
//         </div>

//         <div className={css.actions}>
//           <button type="button" className={css.cancelButton} onClick={onClose}>
//             Cancel
//           </button>
//           <button type="submit" className={css.submitButton}>
//             Create note
//           </button>
//         </div>
//       </form>
//     </>
//   );
// }
