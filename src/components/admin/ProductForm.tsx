import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, Image as ImageIcon } from 'lucide-react';

export const initialFormData = {
  name: '',
  nameEn: '',
  description: '',
  descriptionEn: '',
  price: '',
  originalPrice: '',
  image: '',
  category: '',
  ingredients: '',
  ingredientsEn: '',
  badge: 'none' as 'new' | 'bestseller' | 'organic' | 'none',
  inStock: true
};

interface ProductFormText {
  productName: string;
  productNameEn: string;
  productDescription: string;
  descriptionEn: string;
  price: string;
  originalPrice: string;
  category: string;
  soap: string;
  cream: string;
  oil: string;
  image: string;
  useImageUrl: string;
  uploadFromDevice: string;
  ingredients: string;
  ingredientsEn: string;
  badge: string;
  selectBadge: string;
  none: string;
  new: string;
  bestseller: string;
  organic: string;
  inStock: string;
}

interface ProductFormProps {
  formData: typeof initialFormData;
  setFormData: React.Dispatch<React.SetStateAction<typeof initialFormData>>;
  imageUploadMethod: 'url' | 'upload';
  setImageUploadMethod: React.Dispatch<React.SetStateAction<'url' | 'upload'>>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text: ProductFormText;
}

const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  setFormData,
  imageUploadMethod,
  setImageUploadMethod,
  handleImageUpload,
  text
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">{text.productName}</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="nameEn">{text.productNameEn}</Label>
          <Input
            id="nameEn"
            value={formData.nameEn}
            onChange={(e) => setFormData(prev => ({ ...prev, nameEn: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="description">{text.productDescription}</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="descriptionEn">{text.descriptionEn}</Label>
          <Textarea
            id="descriptionEn"
            value={formData.descriptionEn}
            onChange={(e) => setFormData(prev => ({ ...prev, descriptionEn: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="price">{text.price}</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="originalPrice">{text.originalPrice}</Label>
          <Input
            id="originalPrice"
            type="number"
            value={formData.originalPrice}
            onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="category">{text.category}</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="soap">{text.soap}</SelectItem>
              <SelectItem value="cream">{text.cream}</SelectItem>
              <SelectItem value="oil">{text.oil}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="space-y-4">
        <Label>{text.image}</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={imageUploadMethod === 'url' ? 'default' : 'outline'}
            onClick={() => setImageUploadMethod('url')}
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            {text.useImageUrl}
          </Button>
          <Button
            type="button"
            variant={imageUploadMethod === 'upload' ? 'default' : 'outline'}
            onClick={() => setImageUploadMethod('upload')}
            size="sm"
          >
            <Upload className="h-4 w-4 mr-2" />
            {text.uploadFromDevice}
          </Button>
        </div>

        {imageUploadMethod === 'url' ? (
          <Input
            value={formData.image}
            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
            placeholder="https://example.com/image.jpg"
          />
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        )}

        {formData.image && (
          <div className="mt-2">
            <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ingredients">{text.ingredients}</Label>
          <Textarea
            id="ingredients"
            value={formData.ingredients}
            onChange={(e) => setFormData(prev => ({ ...prev, ingredients: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="ingredientsEn">{text.ingredientsEn}</Label>
          <Textarea
            id="ingredientsEn"
            value={formData.ingredientsEn}
            onChange={(e) => setFormData(prev => ({ ...prev, ingredientsEn: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="badge">{text.badge}</Label>
          <Select
            value={formData.badge}
            onValueChange={(value) => setFormData(prev => ({ ...prev, badge: value as any }))}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder={text.selectBadge} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">{text.none}</SelectItem>
              <SelectItem value="new">{text.new}</SelectItem>
              <SelectItem value="bestseller">{text.bestseller}</SelectItem>
              <SelectItem value="organic">{text.organic}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            
            id="inStock"
            checked={formData.inStock}
            onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, inStock: !!checked }))
            }
          />
          <Label style={{margin:"0 10px"}} htmlFor="inStock">{text.inStock}</Label>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
