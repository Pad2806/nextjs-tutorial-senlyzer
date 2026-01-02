import { twMerge } from 'tailwind-merge';
import { Check } from 'lucide-react';

interface FeatureSectionProps {
  title: string;
  description: string;
  features: string[];
  reversed?: boolean;
  imageContent?: React.ReactNode;
}

export default function FeatureSection({
  title,
  description,
  features,
  reversed = false,
  imageContent,
}: FeatureSectionProps) {
  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className={twMerge(
          "flex flex-col gap-12 lg:gap-20 items-center",
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        )}>
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
                {title}
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                {description}
              </p>
            </div>
            
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-primary mt-0.5">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-base text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Content */}
          <div className="flex-1 w-full max-w-[600px] lg:max-w-none">
            <div className="relative rounded-2xl bg-secondary-bg/50 p-6 md:p-10 border border-gray-100/50">
               {/* Abstract Background Elements */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-2xl -z-10"></div>
               
               <div className="relative rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden min-h-[300px] flex items-center justify-center">
                  {imageContent ? imageContent : (
                    <div className="text-center p-8 text-gray-400">
                      <p>Image Placeholder</p>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
