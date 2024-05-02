import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Platform from "./app/pages/LIVRARIA/Platform";
import Gastao from "./app/pages/LIVRARIA/Gastao/Gastao";
import Dadoas from "./app/pages/LIVRARIA/Dadoas/Dadoas";
import Validaco from "./app/pages/LIVRARIA/Validaco/Validaco";
import Validar from "./app/pages/LIVRARIA/Validar/Validar";
import VoucherDetails from "./app/pages/LIVRARIA/Validaco/VoucherDetails";
import Utilizacado from "./app/pages/LIVRARIA/Utilizacado/Utilizacado";
import Registrar from "./app/pages/LIVRARIA/Registrar/Registrar";
import Pogamento from "./app/pages/LIVRARIA/Pogamento/Pogamento";
import Painel from "./app/pages/DGLAB/Painel";
import Validacao from "./app/pages/DGLAB/Validacao/Validacao";
import Dadoa from "./app/pages/DGLAB/Dadoas/Dadoa";
import Mensagens from "./app/pages/DGLAB/Mensagens/Mensagens";
import RelatorioVoucher from "./app/pages/DGLAB/RelatorioVoucher";
import RelatriaoLivraria from "./app/pages/DGLAB/RelatriaoLivraria";
import LivrariaLogin from "./app/pages/LIVRARIA/Login/LivrariaLogin";
import BookStore from "./app/pages/LIVRARIA/BookStore";
import ForgotPassword from "./app/pages/LIVRARIA/Authenticate/ForgotPassword";
import Error from "./app/pages/Error";
import FfcLogin from "./app/pages/FFC/Login/FfcLogin";
import FfcMensagens from "./app/pages/FFC/Mensagens/FfcMensagens";
import FfcPainel from "./app/pages/FFC/Painel/FfcPainel";
import ApelLogin from "./app/pages/APEL/Login/ApelLogin";
import ApelPainel from "./app/pages/APEL/Painel/ApelPainel";
import Atualizar from "./app/pages/APEL/Atualizar";
import ValidacaoDasLivraris from "./app/pages/DGLAB/ValidacaoDasLivraris";
import PesquiasVoucher from "./app/pages/LIVRARIA/PesquiasVoucher";

export const App = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState(null);

  useEffect(() => {
    const storedType = JSON.parse(
      localStorage.getItem("livrariaLoginData")
    )?.type;
    setLoginType(storedType);
    if (!storedType) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LivrariaLogin />} />
      <Route path="/painel" element={<Platform />} />
      <Route path="/gastao" element={<Gastao />} />
      <Route path="/dadoas" element={<Dadoas />} />
      <Route path="/validaco" element={<Validaco />} />
      <Route path="/validar" element={<Validar />} />
      <Route path="/pesquisa-voucher" element={<PesquiasVoucher />} />
      <Route path="/validaco-voucher" element={<VoucherDetails />} />
      <Route path="/utilizacao-voucher" element={<Utilizacado />} />
      <Route path="/registrar-voucher" element={<Registrar />} />
      <Route path="/pagamento-voucher" element={<Pogamento />} />
      <Route path="/criar-bookstore" element={<BookStore />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dg-painel" element={<Painel />} />
      <Route path="/dg-validacao" element={<Validacao />} />
      <Route path="/dg-dadoas" element={<Dadoa />} />
      <Route path="/dg-messagens" element={<Mensagens />} />
      <Route path="/dg-relatorioVoucher" element={<RelatorioVoucher />} />
      <Route path="/dg-relatorioLivraria" element={<RelatriaoLivraria />} />
      <Route path="/dg-validacao-das-livraris" element={<ValidacaoDasLivraris />} />
      <Route path="*" element={<Error />} />
{/* ffc routes */}
      <Route path="/ffc-login" element={<FfcLogin />} />
      <Route path="/ffc-mensagens" element={<FfcMensagens />} />
      <Route path="/ffc-painel" element={<FfcPainel />} />

      {/* apel routes */}
      <Route path="/apel-login" element={<ApelLogin />} />
      <Route path="/apel-atualizar" element={<Atualizar />} />
      <Route path="/apel-painel" element={<ApelPainel />} />

    </Routes>
  );
};
