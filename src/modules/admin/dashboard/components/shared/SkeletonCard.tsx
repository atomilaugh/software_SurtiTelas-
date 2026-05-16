import { motion } from 'framer-motion';

import { cn } from '@/shared/utils';

interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard = ({
  className,
}: SkeletonCardProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className={cn(
        `
          relative
          overflow-hidden

          rounded-[30px]

          border

          bg-white
          dark:bg-[#0F1117]

          border-[#E8ECF2]
          dark:border-white/[0.06]

          p-6

          shadow-[0_4px_20px_rgba(15,23,42,0.04)]
          dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]
        `,
        className
      )}
    >
      {/* Ambient Glow */}

      <div
        className="
          pointer-events-none

          absolute
          right-[-60px]
          top-[-60px]

          h-[160px]
          w-[160px]

          rounded-full

          bg-indigo-500/[0.03]

          blur-3xl
        "
      />

      {/* Shimmer */}

      <div
        className="
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            inset-y-0
            left-[-120%]

            w-[60%]

            animate-[shimmer_2.2s_infinite]

            bg-gradient-to-r
            from-transparent
            via-white/40
            to-transparent

            dark:via-white/[0.04]
          "
        />
      </div>

      {/* Content */}

      <div
        className="
          relative
          z-10

          flex
          items-start
          justify-between
          gap-5
        "
      >
        {/* Left */}

        <div className="flex-1">
          <div
            className="
              h-5
              w-24

              rounded-lg

              bg-[#E9EEF5]
              dark:bg-white/[0.06]
            "
          />

          <div
            className="
              mt-4

              h-10
              w-40

              rounded-xl

              bg-[#F1F5F9]
              dark:bg-white/[0.04]
            "
          />

          <div
            className="
              mt-4

              flex
              items-center
              gap-2
            "
          >
            <div
              className="
                h-6
                w-16

                rounded-full

                bg-[#DCFCE7]
                dark:bg-emerald-500/10
              "
            />

            <div
              className="
                h-4
                w-24

                rounded-md

                bg-[#F1F5F9]
                dark:bg-white/[0.04]
              "
            />
          </div>
        </div>

        {/* Icon */}

        <div
          className="
            relative

            flex
            h-[64px]
            w-[64px]
            shrink-0
            items-center
            justify-center

            rounded-2xl

            bg-[#F4F7FB]
            dark:bg-white/[0.04]

            border
            border-[#EEF2F7]
            dark:border-white/[0.05]
          "
        >
          <div
            className="
              h-7
              w-7

              rounded-xl

              bg-[#DCE3ED]
              dark:bg-white/[0.06]
            "
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SkeletonCard;