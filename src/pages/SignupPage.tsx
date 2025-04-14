
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Key, Mail, ArrowRight, User, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import PixelatedBox from "@/components/PixelatedBox";
import PixelHeader from "@/components/PixelHeader";
import PixelButton from "@/components/PixelButton";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import audioManager from "@/utils/audio";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });
  
  const onSubmit = (data: SignupFormValues) => {
    audioManager.playButtonClick();
    
    // TODO: Replace with actual sign up functionality when backend is connected
    localStorage.setItem("pixelQuizPlayerName", data.name);
    
    toast({
      title: "Account created!",
      description: "Welcome to Pixel Quiz Quest! Your progress will be saved to the cloud.",
    });
    
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen pt-28 pb-10 px-4">
      <div className="container mx-auto max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PixelatedBox className="p-6">
            <PixelHeader className="mb-6 text-center">
              <UserPlus className="inline-block mr-2 h-6 w-6" />
              Create Your Account
            </PixelHeader>
            
            <p className="text-center font-minecraft text-pixel-brown mb-6">
              Sign up to track your progress and compete on global leaderboards!
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-minecraft">Username</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-pixel-brown" />
                          <Input 
                            className="pl-10" 
                            placeholder="Your gaming nickname" 
                            {...field}
                            required
                            maxLength={15}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-minecraft">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-pixel-brown" />
                          <Input 
                            className="pl-10" 
                            placeholder="youremail@example.com" 
                            type="email"
                            {...field}
                            required
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-minecraft">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Key className="absolute left-3 top-3 h-4 w-4 text-pixel-brown" />
                          <Input 
                            className="pl-10" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Create a password" 
                            {...field}
                            required
                            minLength={6}
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-pixel-brown"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="!mt-8">
                  <PixelButton className="w-full">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </PixelButton>
                </div>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="font-minecraft text-pixel-brown">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-minecraft-grass hover:underline"
                  onClick={() => audioManager.playButtonClick()}
                >
                  Log In
                </Link>
              </p>
              
              <div className="mt-4">
                <Button 
                  variant="ghost" 
                  className="font-minecraft text-xs"
                  onClick={() => {
                    audioManager.playButtonClick();
                    navigate("/");
                  }}
                >
                  Return to Home
                </Button>
              </div>
            </div>
            
            <div className="border-t border-pixel-brown/20 mt-6 pt-6">
              <p className="text-center text-xs text-pixel-brown/70">
                By signing up, your progress will be saved to the cloud and synced across devices.
              </p>
            </div>
          </PixelatedBox>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
