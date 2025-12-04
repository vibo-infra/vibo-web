import {useState} from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import MultiSelectRadio from '../../components/ui/MultiSelectRadio';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

interface FormValues {
  phone: string;
  instagram: string;
}

interface HandleSubmitProps {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
}

interface FieldProps {
  field: {
    value: string;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: React.FocusEvent<any>) => void;
  };
}

const validationSchema = Yup.object({
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .test('is-valid-number', 'Invalid phone number', (value) => {
      if (!value) return false;
      return /^[6-9]\d{9}$/.test(value); 
    }),
  instagram: Yup.string()
    .required('Instagram handle is required')
    .matches(/^@?(\w){1,15}$/, 'Invalid Instagram handle (1-15 characters, letters/numbers/underscore only)')
    .transform((value) => value.replace(/^@/, '')) // Remove @ if present
});

const ErrorText = ({ name }: { name: string }) => (
  <div className="h-5 mb-1">
    <ErrorMessage name={name}>
      {(msg) => <div className="text-red-100 text-xs">{msg}</div>}
    </ErrorMessage>
  </div>
);

const RegisterToEvent = () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const navigate = useNavigate();
    
    
  const interestsList = [
    'Explore New Places',
    'Meet New People',
    'Learn New Skills',
    'Have Fun',
    'Networking',
    'Other Interests'
  ];

  const initialValues = {
    phone: '',
    instagram: ''
  };

  const handleSubmit = (values: FormValues, { setSubmitting, resetForm }: HandleSubmitProps) => {
    const formData = {
      ...values,
      instagram: values.instagram.startsWith('@') ? values.instagram : `@${values.instagram}`,
      interests: selectedItems
    };
    
    console.log('Form data:', formData);
    
    // Simulate API call
    setTimeout(() => {
      alert('Registration successful!');
      resetForm();
      setSelectedItems([]);
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="w-screen min-h-screen bg-background-primary top-0 left-0 fixed overflow-y-auto">
    <IoIosArrowBack 
        className="absolute top-6 left-4 text-xl text-text-muted cursor-pointer"
        onClick={() => navigate('/explore')}
      />
      <div className="max-w-xxl mx-auto py-[15%] px-4">
        <h1 className="text-center text-xxl font-bold text-text mb-4">
          Register for Event
        </h1>
        <p className="text-center text-md text-text-muted mb-12">
          Tell us more about yourself
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ isSubmitting, handleSubmit }) => (
            <div className="flex flex-col gap-2 w-full max-w-lg mx-auto">
              {/* Phone Number Field */}
              <Field name="phone">
                {({ field }: FieldProps) => (
                  <>
                    <Input
                      {...field}
                      type="tel"
                      label="Contact Number"
                      placeholder="Enter 10-digit phone number"
                      className="h-20 shadow-soft"
                      maxLength={10}
                    />
                    <ErrorText name="phone" />
                  </>
                )}
              </Field>

              {/* Instagram Handle Field */}
              <Field name="instagram">
                {({ field }: FieldProps) => (
                  <>
                    <Input
                      {...field}
                      type="text"
                      label="Instagram Handle"
                      placeholder="@username"
                      className="h-20 shadow-soft"
                      maxLength={16}
                    />
                    <ErrorText name="instagram" />
                  </>
                )}
              </Field>

              {/* Interests Selection */}
              <div className="mt-6">
                <label className="block text-sm font-medium mb-3 text-text-secondary-light">
                  What are you interested in? (Optional)
                </label>
                <MultiSelectRadio
                  list={interestsList}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  className="flex flex-wrap gap-2"
                />
              </div>

              {/* Submit Button */}
              <Button
                variant="primary"
                className="h-20 shadow-soft mt-20 font-semibold text-md text-text-light absolute bottom-8 left-1/2 transform -translate-x-1/2 max-w-lg w-full"
                onClick={handleSubmit}
                disabled={isSubmitting}
                type='submit'
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </Button>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterToEvent;