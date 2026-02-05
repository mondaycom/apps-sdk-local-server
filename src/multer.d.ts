import 'multer';

declare module 'multer' {
  interface Field {
    multiple?: boolean;
  }
}
