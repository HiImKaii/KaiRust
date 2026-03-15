import { Chapter } from '../../courses';
import { keywords } from './keywords';
import { operators } from './operators';
import { derivableTraits } from './derivable_traits';
import { developmentTools } from './development_tools';
import { editions } from './editions';

export const appendix: Chapter = {
  id: 'appendix',
  title: 'Phụ Lục',
  introduction: `
    <h2>Phụ Lục</h2>
    <p>Các phần sau chứa tài liệu tham khảo mà bạn có thể thấy hữu ích trong hành trình Rust của mình.</p>
  `,
  lessons: [keywords, operators, derivableTraits, developmentTools, editions]
};
