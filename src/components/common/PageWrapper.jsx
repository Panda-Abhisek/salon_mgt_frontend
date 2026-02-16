// const PageWrapper = ({ children }) => {
//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       {children}
//     </div>
//   );
// };

// export default PageWrapper;


// -------------------------------------------------------------------------------------
// ✅ Version 1 — Most reliable (recommended)
const PageWrapper = ({ children }) => {
  return (
    <div className="w-full h-full p-4">
      {children}
    </div>
  );
};

export default PageWrapper;


// -------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------
// ✅ Version 2 — If content should never scroll at all

// Use this only if the page content is guaranteed small:

// const PageWrapper = ({ children }) => {
//   return (
//     <div className="h-screen w-full flex items-center justify-center overflow-hidden p-4">
//       {children}
//     </div>
//   );
// };

// export default PageWrapper;

// ⚠️ This will cut off content if it grows too tall.
// -------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------
// ✅ 100dvh = dynamic viewport height (modern browsers)
// const PageWrapper = ({ children }) => {
//   return (
//     <div className="h-dvh w-full overflow-hidden flex items-center justify-center">
//       <div className="w-full max-w-full h-full overflow-auto p-4">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default PageWrapper;
// -------------------------------------------------------------------------------------

