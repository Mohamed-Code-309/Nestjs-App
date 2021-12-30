export interface IProduct {
    id: string;
    productName: string;
    productCode?: string;
    description?: string;
    price?: number;
    categoryId?: number;
    category?: string;
    quantityInStock?: number;
    searchKey?: string[];
    supplierIds?: number[];
  }