// src/components/AnimatedNumber.jsx
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);

  const springValue = useSpring(motionValue, { duration: 3000, bounce: 0 });
 
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
   
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
     
        ref.current.textContent = Intl.NumberFormat("en-US").format(latest.toFixed(0));
      }
    });
    return () => unsubscribe();
  }, [springValue]);
  
 
  return <span ref={ref} />;
}