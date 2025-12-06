import {useState, useEffect} from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import MultiSelectRadio from '../../components/ui/MultiSelectRadio';
import { IoIosArrowBack } from "react-icons/io";
import { registerForEvent } from '../../services/apiServices';

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
    const { eventId } = useParams<{ eventId: string }>();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
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

  useEffect(() => {
    if (!eventId) {
      navigate('/explore');
    }
  }, [eventId, navigate]);

  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: HandleSubmitProps) => {
    if (!eventId) {
      setError('Event ID is required');
      setSubmitting(false);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      const instagramHandle = values.instagram.startsWith('@') 
        ? values.instagram.replace('@', '') 
        : values.instagram;

      const registrationData = {
        eventId,
        mobileNumber: values.phone,
        instagram: instagramHandle
      };

      const response = await registerForEvent(registrationData);
      
      if (response.success) {
        toast.success('Registration successful!');
        resetForm();
        setSelectedItems([]);
        navigate(`/event/${eventId}`, { replace: true });
      } else {
        const errorMessage = 'Registration failed. Please try again.';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during registration';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-background-primary top-0 left-0 fixed overflow-y-auto">
    <IoIosArrowBack 
        className="absolute top-6 left-4 text-xl text-text-muted cursor-pointer"
        onClick={() => eventId ? navigate(`/event/${eventId}`) : navigate('/explore')}
      />
      <div className="max-w-xxl mx-auto py-[15%] px-4">
        <h1 className="text-center text-xxl font-bold text-text mb-4">
          Let’s get you in.
        </h1>
        <p className="text-center text-md text-text-muted mb-12">
          Tell us more about yourself
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ handleSubmit: formikHandleSubmit }) => (
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
                onClick={formikHandleSubmit}
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