import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Key, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import PixelatedBox from "@/components/PixelatedBox";
import PixelHeader from "@/components/PixelHeader";
import PixelButton from "@/components/PixelButton";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import audioManager from "@/utils/audio";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  
  // add data later if i wanna build a backend data: LoginFormValues
  const onSubmit = () => {
    audioManager.playButtonClick();
    
    // TODO: Replace with actual authentication when backend is connected
    toast({
      title: "Login successful!",
      description: "Welcome back! Your progress will be saved to the cloud.",
    });
    
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen pt-28 pb-10 px-4 sm:mt-0 mt-14">
      <div className="container mx-auto max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PixelatedBox className="p-6">
            <PixelHeader className="mb-6 text-center">
              <LogIn className="inline-block mr-2 h-6 w-6" />
              Log In to Your Account
            </PixelHeader>
            
            <p className="text-center font-minecraft text-pixel-brown mb-6">
              Sign in to save your quiz progress and compete on leaderboards!
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                            placeholder="Enter your password" 
                            {...field}
                            required
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
                    Log In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </PixelButton>
                </div>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="font-minecraft text-pixel-brown">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="text-minecraft-grass hover:underline"
                  onClick={() => audioManager.playButtonClick()}
                >
                  Sign Up
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
                By logging in, your progress will be saved to the cloud and synced across devices.
              </p>
            </div>
          </PixelatedBox>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
