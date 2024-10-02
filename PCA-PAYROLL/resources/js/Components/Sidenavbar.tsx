import { cn } from "@/lib/utils"
import { Separator } from "./ui/separator";
import { Link } from "@inertiajs/react";
import NavLink from "./NavLink";
import { LucideProps } from "lucide-react";

interface SidenavbarProps {
  children: React.ReactNode;
  className?: String;
}

interface Link {
  label: string;
  url: string;
  icon: React.ComponentType<LucideProps>
}

interface SidenavbarlinksProps {
  links: Link[];
  activePage?: string;
}


export function Sidenavbarlinks({links, activePage}: SidenavbarlinksProps){

  return (
    <>
      <ul className="flex flex-col gap-3">
        {links.map(link => (
          <li key={link.label}>
          <NavLink href={route(link.url)}
            active={activePage === '/'+link.url}
            >
              <link.icon/>
              <span className="px-2">{link.label}</span>
          </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Sidenavbargroup({title, className , children} : {title: String, className?: String, children: React.ReactNode}){
  return (
    <>
      <section className={cn("w-full flex flex-col gap-4 px-5 z-50", className)}>
        <h1 className="text-white font-bold text-2xl">{title}</h1>
        {children}
        <Separator/>
      </section>
    </>
  );
}

export function Sidenavbar({children, className} : SidenavbarProps) {
  return (
    <aside className={cn("fixed bg-baseGreen w-[350px] h-screen", className)}>
      {children}
    </aside>
  )
}
