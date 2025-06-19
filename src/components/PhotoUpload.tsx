
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, X, Check, FileImage } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PhotoUploadProps {
  onUpload?: (file: File) => void;
  medicationId?: number;
  disabled?: boolean;
}

interface UploadedPhoto {
  id: string;
  file: File;
  preview: string;
  timestamp: Date;
  status: 'uploading' | 'success' | 'error';
}

export const PhotoUpload = ({ onUpload, medicationId, disabled = false }: PhotoUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    const photoId = Date.now().toString();
    const preview = URL.createObjectURL(file);
    
    const newPhoto: UploadedPhoto = {
      id: photoId,
      file,
      preview,
      timestamp: new Date(),
      status: 'uploading'
    };

    setPhotos(prev => [newPhoto, ...prev]);
    setUploading(true);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPhotos(prev => 
        prev.map(p => 
          p.id === photoId ? { ...p, status: 'success' } : p
        )
      );
      
      onUpload?.(file);
      
      toast({
        title: "Photo uploaded successfully",
        description: `Medication proof for ${new Date().toLocaleDateString()} has been saved`,
      });
    } catch (error) {
      setPhotos(prev => 
        prev.map(p => 
          p.id === photoId ? { ...p, status: 'error' } : p
        )
      );
      
      toast({
        title: "Upload failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (photoId: string) => {
    setPhotos(prev => {
      const photo = prev.find(p => p.id === photoId);
      if (photo) {
        URL.revokeObjectURL(photo.preview);
      }
      return prev.filter(p => p.id !== photoId);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (!disabled) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="space-y-4">
      <Card 
        className={`border-2 border-dashed transition-colors ${
          dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-400'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Camera className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Upload Medication Proof</h3>
              <p className="text-gray-600 mb-4">
                Take a photo or drag and drop an image to verify medication intake
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button 
                  variant="outline" 
                  disabled={disabled || uploading}
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  {uploading ? (
                    <>
                      <Upload className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </>
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  disabled={disabled}
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  <FileImage className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files)}
        className="hidden"
        capture="environment"
      />

      {photos.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-gray-700">Recent Photos</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={photo.preview}
                    alt="Medication proof"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute top-2 right-2 flex gap-1">
                  {photo.status === 'uploading' && (
                    <Badge variant="secondary" className="text-xs">
                      <Upload className="h-3 w-3 mr-1 animate-spin" />
                      Uploading
                    </Badge>
                  )}
                  {photo.status === 'success' && (
                    <Badge variant="default" className="text-xs">
                      <Check className="h-3 w-3 mr-1" />
                      Uploaded
                    </Badge>
                  )}
                  {photo.status === 'error' && (
                    <Badge variant="destructive" className="text-xs">
                      Error
                    </Badge>
                  )}
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 left-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removePhoto(photo.id)}
                >
                  <X className="h-3 w-3" />
                </Button>

                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg">
                  {photo.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
