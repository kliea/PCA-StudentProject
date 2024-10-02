import { cn } from "@/lib/utils"
import { Separator } from "./ui/separator";
import { Link } from "@inertiajs/react";

interface SidenavbarProps {
  children: React.ReactNode;
  className?: String;
}

interface Link {
  label: string;
  url: string;
}

interface SidenavbarlinksProps {
  links: Link[];
}


export function Sidenavbarlinks({links}: SidenavbarlinksProps){

  return (
    <>
      <ul>
        {links.map(link => (
          <li key={link.label}>
            <Link href={route('logout')} method="post" as="button">{link.label}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Sidenavbargroup({title, className , children} : {title: String, className?: String, children: React.ReactNode}){
  return (
    <>
      <section className={cn("w-full flex flex-col gap-4 px-5", className)}>
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
