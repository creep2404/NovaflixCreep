import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  // JS config
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      globals: globals.node
    },
    ...js.configs.recommended
  },

  // TS config
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    languageOptions: {
      ...config.languageOptions,
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json'
      },
      globals: globals.node
    }
  })),

  // Custom rules
  {
    files: ['**/*.ts'],
    rules: {
      // 
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // bỏ qua param như (_req, _res)
          varsIgnorePattern: '^_' // bỏ qua biến như _password
        }
      ],

      '@typescript-eslint/no-explicit-any': 'off',

      'no-console': 'off',

      // Bắt buộc xử lý Promise (tránh bug async silent)
      '@typescript-eslint/no-floating-promises': 'error',

      // Tránh dùng Promise sai chỗ (ví dụ trong if, forEach...)
      '@typescript-eslint/no-misused-promises': 'error',

      // Không await thứ không phải Promise
      '@typescript-eslint/await-thenable': 'error',

      // Bắt buộc dùng === thay vì == (tránh bug type coercion)
      eqeqeq: ['error', 'always'],

      // Không cho import trùng
      'no-duplicate-imports': 'error',

      // Gợi ý dùng optional chaining (obj?.a?.b)
      '@typescript-eslint/prefer-optional-chain': 'warn',

      // Gợi ý dùng ?? thay vì || (tránh bug với 0, "")
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',

      // Function quá phức tạp (cyclomatic complexity > 10)
      complexity: ['warn', 10],

      // Nested quá sâu → khó đọc
      'max-depth': ['warn', 4]
    }
  }
])
