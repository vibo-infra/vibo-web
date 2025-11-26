import Button from "../ui/Button";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";

const OAuth = () => {

    const OAUTH_PROVIDERS = [
        {
            name: 'Google',
            icon: <FcGoogle className="w-10 h-10 mr-2" />,
            authUrl: '/auth/google',
        },
        {
            name: 'Facebook',
            icon: <IoLogoFacebook className="w-10 h-10 mr-2 text-blue-500" />,
            authUrl: '/auth/facebook',
        },
    ];

  return (
    <div className="flex flex-col gap-6">
      {OAUTH_PROVIDERS.map((provider) => (
        <div key={provider.name} className="flex items-center">
            <Button variant="ghost" className="w-full h-20 text-md font-medium">
                {provider.icon}
                Sign in with {provider.name}
            </Button>
        </div>
      ))}
    </div>
  )
}

export default OAuth
