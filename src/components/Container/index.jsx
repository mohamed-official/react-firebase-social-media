const Container = ({ children, ...rest }) => {
  return (
    <div className="container mx-auto px-10">
      <div {...rest}>{children}</div>
    </div>
  );
};

export default Container;
