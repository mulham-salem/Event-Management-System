import React from "react";
import { motion } from "framer-motion";
import { HostCard } from "./HostCard";
import type { Host } from "../../api/hosts";

interface HostsGridProps {
  hosts: Host[];
}

export const HostsGrid: React.FC<HostsGridProps> = ({ hosts }) => {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08 },
        },
      }}
      className="grid grid-cols-1 gap-6 px-4 pb-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
    >
      {hosts.map((host) => (
        <motion.div
          key={host.id}
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mx-auto w-80"
        >
          <HostCard host={host} /> 
        </motion.div>
      ))}
    </motion.section>
  );
};
