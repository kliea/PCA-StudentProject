interface Item {
    label: string;
    url: string;
    icon: React.ComponentType<LucideProps>;
}

export interface navigationLinks {
    title: string;
    items: Item[];
}
