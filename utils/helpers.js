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
    }
  };