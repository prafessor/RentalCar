import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../Button/Button';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './BookingFrom.module.css';

const initialValues = {
  username: '',
  email: '',
  date: '',
  comment: '',
};

const bookingSchema = Yup.object().shape({
  username: Yup.string().required('Required filed'),
  email: Yup.string().email('Invalid email').required('Required filed'),
  date: Yup.string(),
  comment: Yup.string(),
});

const onSubmit = (values, actions) => {
  actions.resetForm();
  toast.success('Successfully sent!');
};

const customDatePicker = ({ field, form, ...props }) => {
  return (
    <DatePicker
      {...props}
      selected={field.value}
      onChange={val => form.setFieldValue(field.name, val)}
    />
  );
};

export default function BookingForm() {
  return (
    <div className={css.form}>
      <h2 className={css.title}>Book your car now</h2>
      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={bookingSchema}
        onSubmit={onSubmit}
      >
        <Form className={css.form_wrapper} autoComplete="off">
          <div className={css.field_wrapper}>
            <Field
              className={css.field}
              type="text"
              name="username"
              placeholder="Name*"
            />
            <span className={css.field_error}>
              <ErrorMessage name="username" />
            </span>
          </div>
          <div className={css.field_wrapper}>
            <Field
              className={css.field}
              type="email"
              name="email"
              placeholder="Email*"
            />
            <span className={css.field_error}>
              <ErrorMessage name="email" />
            </span>
          </div>
          <div className={css.field_wrapper}>
            <Field
              className={css.field}
              name="date"
              component={customDatePicker}
              minDate={new Date()}
              placeholderText="Booking date"
            />
            <span className={css.field_error}>
              <ErrorMessage name="date" />
            </span>
          </div>
          <div className={css.field_wrapper}>
            <Field
              className={`${css.field} ${css.field_comment}`}
              as="textarea"
              name="comment"
              placeholder="Comment"
            />
            <span className={css.field_error}>
              <ErrorMessage name="comment" />
            </span>
          </div>
          <Button type="submit" className="button_submit">
            Send
          </Button>
        </Form>
      </Formik>
      <Toaster position="top-right" />
    </div>
  );
}
