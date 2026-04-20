import { applyDecorators, UseInterceptors, SetMetadata } from '@nestjs/common';
import type { Type } from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import type { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import {
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import type {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const FILE_UPLOAD_METADATA_KEY = 'FILE_UPLOAD_METADATA_KEY';

/**
 * Generates the properties part of the Swagger Schema for File Uploads.
 */
function getFileProperties(
  options: string | MulterField[],
  maxCount = 1,
): Record<string, SchemaObject | ReferenceObject> {
  const properties: Record<string, SchemaObject | ReferenceObject> = {};

  if (typeof options === 'string') {
    properties[options] =
      maxCount === 1
        ? { type: 'string', format: 'binary' }
        : {
            type: 'array',
            items: { type: 'string', format: 'binary' },
          };
  } else {
    options.forEach((field) => {
      properties[field.name] =
        field.maxCount === 1
          ? { type: 'string', format: 'binary' }
          : {
              type: 'array',
              items: { type: 'string', format: 'binary' },
            };
    });
  }

  return properties;
}

/**
 * Builds the final ApiBody schema, merging the DTO if provided.
 */
function buildApiBody(
  options: string | MulterField[],
  maxCount = 1,
  dto?: Type<unknown>,
  required = false,
) {
  const fileProperties = getFileProperties(options, maxCount);

  if (!dto) {
    return ApiBody({
      required,
      schema: {
        type: 'object',
        properties: fileProperties,
      },
    });
  }

  return applyDecorators(
    ApiExtraModels(dto),
    ApiBody({
      required,
      schema: {
        allOf: [
          { $ref: getSchemaPath(dto) },
          { type: 'object', properties: fileProperties },
        ],
      },
    }),
  );
}

/**
 * Decorator for a single file upload (Single Field - Single File).
 * @param fieldName - Field name in the form.
 * @param dto - Optional DTO to merge.
 */
export function ApiFile(
  fieldName = 'file',
  dto?: Type<unknown>,
  required = false,
) {
  return applyDecorators(
    SetMetadata(FILE_UPLOAD_METADATA_KEY, true),
    UseInterceptors(FileInterceptor(fieldName)),
    ApiConsumes('multipart/form-data'),
    buildApiBody(fieldName, 1, dto, required),
  );
}

/**
 * Smart Decorator for multiple files.
 * Supports both Multi-File (Single Field) and Multi-Field (Multiple Names).
 *
 * @example @ApiFiles('photos', 5, UpdateDto) // 1 field, 5 files
 * @example @ApiFiles([{ name: 'avatar', maxCount: 1 }], UpdateDto) // Multiple fields
 */
export function ApiFiles(
  options: string | MulterField[],
  maxCountOrDto?: number | Type<unknown>,
  dtoOrRequired?: Type<unknown> | boolean,
  required = false,
) {
  let maxCount = 10;
  let dto: Type<unknown> | undefined;
  let isRequired = required;

  // Logic to handle overloaded parameters
  if (typeof options === 'string') {
    maxCount = typeof maxCountOrDto === 'number' ? maxCountOrDto : 10;
    dto = typeof dtoOrRequired === 'function' ? dtoOrRequired : undefined;
    isRequired = typeof dtoOrRequired === 'boolean' ? dtoOrRequired : required;
  } else {
    // Array of MulterFields
    dto = typeof maxCountOrDto === 'function' ? maxCountOrDto : undefined;
    isRequired = typeof dtoOrRequired === 'boolean' ? dtoOrRequired : required;
  }

  const interceptor =
    typeof options === 'string'
      ? FilesInterceptor(options, maxCount)
      : FileFieldsInterceptor(options);

  return applyDecorators(
    SetMetadata(FILE_UPLOAD_METADATA_KEY, true),
    UseInterceptors(interceptor),
    ApiConsumes('multipart/form-data'),
    buildApiBody(options, maxCount, dto, isRequired),
  );
}
