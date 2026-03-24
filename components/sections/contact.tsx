"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animation-variants";
import { Button } from "@/components/ui/button";

const heading = "Let's Create Something Amazing Together".split(" ");

export function Contact() {

  const handleDownload = () => {
      const link = document.createElement("a");
      link.href = "/assets/resume.pdf";
      link.download = "Pramila-K-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  return (
    
    <div className="text-center max-w-4xl mx-auto">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-8">
          {heading.map((word, index) => (
            <motion.span
              key={index}
              variants={staggerItem}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-lg md:text-xl text-foreground/60 mb-12"
      >
        Ready to bring your ideas to life? Get in touch and let's start a
        conversation.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <motion.a
          href="mailto:pramilak.2412@gmail.com"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            size="lg"
            className="py-3 cursor-pointer bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            <span>Send Email</span>
          </Button>
        </motion.a>

        <motion.a
          onClick={handleDownload}
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 cursor-pointer py-3 hover:border-white/40 hover:bg-white/5"
          >
            Download Resume
          </Button>
        </motion.a>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mt-16 flex gap-6 justify-center"
      >
        {[
          { name: "GitHub", url: "https://github.com/pramila2412" },
          { name: "LinkedIn", url: "https://www.linkedin.com/in/pramila-k2410" },
          { name: "Phone", url: "tel:+919566156662" },
        ].map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-foreground transition-colors relative group"
            whileHover={{ y: -2 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
          >
            {social.name}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] group-hover:w-full transition-all duration-300" />
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
