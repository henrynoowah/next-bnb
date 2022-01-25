import { useEffect, useRef, useState, FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  .modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }
  .modal-contents {
    width: 400px;
    height: 400px;
    background-color: white;
    z-index: 11;
  }
`;

interface IProps {
  children: ReactNode;
  closePortal: VoidFunction;
}

const ModalPortal: FC<IProps> = ({ children, closePortal }) => {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (document) {
      const dom = document.querySelector("#root-modal");
      ref.current = dom;
    }
  }, []);

  if (ref.current && mounted) {
    return createPortal(
      <Container>
        <div className="modal-background" />
        {children}
      </Container>,
      ref.current
    );
  }
  return null;
};

export default ModalPortal;
