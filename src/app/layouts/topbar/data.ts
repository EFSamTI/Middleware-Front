export interface MenuItem {
    id?: number;
    label?: any;
    icon?: string;
    link?: string;
    subItems?: any;
    isTitle?: boolean;
    badge?: any;
    parentId?: number;
    isLayout?: boolean;
}

export const MENU: MenuItem[] = [
    { id: 1, label: 'main.menu', isTitle: true },
    // {
    //     id: 2, label: 'main.paas.text', icon: 'academicons/semantic-scholar', subItems: [
    //         { id: 3, parentId: 2, label: 'main.paas.business.text' },
    //         { id: 4, parentId: 2, label: 'main.paas.generic.text' }
    //     ]
    // }
];