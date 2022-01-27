export interface Category {
  id: number;
  categoryName?: string;
  optionName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResidencyCategory extends Category {
  categoryName: 'residency_type';
}

export interface TaxCategory extends Category {
  categoryName: 'tax_type';
}
