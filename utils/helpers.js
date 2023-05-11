module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    bio_cut: (bio) => {
      const bioArr = bio.split('');
      if (bioArr.length > 30) {
        const cutBioArr = bioArr.slice(0, 30);
        return cutBioArr.join('');
      } else {
        return bio;
      }
    },
    when: (operand_1, operator, operand_2, options) => {
      let operators = {                     //  {{#when <operand1> 'eq' <operand2>}}
        'eq': (l,r) => l == r,              //  {{/when}}
        'noteq': (l,r) => l != r,
        'gt': (l,r) => (+l) > (+r),                        // {{#when var1 'eq' var2}}
        'gteq': (l,r) => ((+l) > (+r)) || (l == r),        //               eq
        'lt': (l,r) => (+l) < (+r),                        // {{else when var1 'gt' var2}}
        'lteq': (l,r) => ((+l) < (+r)) || (l == r),        //               gt
        'or': (l,r) => l || r,                             // {{else}}
        'and': (l,r) => l && r,                            //               lt
        '%': (l,r) => (l % r) === 0                        // {{/when}}
      }
      let result = operators[operator](operand_1,operand_2);
      if(result) return options.fn(this); 
      return options.inverse(this);       
    }
  };